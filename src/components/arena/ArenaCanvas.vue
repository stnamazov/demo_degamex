<script setup>

    import Phaser from 'phaser'
    import { ColorAttribute, SpinePlugin } from "@esotericsoftware/spine-phaser"
    import { ref, computed, watch, nextTick, reactive, onMounted, onUnmounted, defineEmits, defineProps } from 'vue'
    import { useStore } from 'vuex'
    import { isDemo } from '@/demo/demo.js'
    import defaultAvatarUrl from '@/assets/spins-default-avatar.svg'

    const store = useStore()
    const address = computed(() => store.getters.address)

    const emit = defineEmits(['complete', 'result'])
    const props = defineProps({ 
        arena: Object,
        timer: String,
    })
    const isLoading = ref(true)
    const isAttacksProcess = ref(false)
    const game = ref()
    const ui = ref({})
    const players = ref({})
    const playersText = ref({
        player1: '',
        player2: '',
    })
    const playersCurrentBalance = ref({
        player1: 0,
        player2: 0,
    })
    const playersCurrentWins = ref({
        player1: 0,
        player2: 0,
    })
    const playersCurrentBalanceShift = ref({
        player1: 0,
        player2: 0,
    })

    let showDamageText, showBlockText, showCritText, showMainText

    const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
    const DEFAULT_WIDTH = 1480
    const DEFAULT_HEIGHT = 800
    const CENTER_H = DEFAULT_HEIGHT / 2
    const CENTER_W = DEFAULT_WIDTH / 2
    const START_SCALE = 0.45

    const phaserConfig = {
        type: Phaser.WEBGL,
        transparent: true,
        plugins: { scene: [{ key: "spine.SpinePlugin", plugin: SpinePlugin, mapping: "spine", start: true }] },
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        scale: {
            mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            parent: 'arena-container'
        }
    }

    function preload() {
    
        this.load.spineBinary("ui-data", './assets/spine/ui/ui.json')
        this.load.spineAtlas("ui-atlas", './assets/spine/ui/ui.atlas')
        this.load.spineBinary("ui-b-data", './assets/spine/ui/ui_bottom.json')
        this.load.spineAtlas("ui-b-atlas", './assets/spine/ui/ui_bottom.atlas')
        this.load.spineBinary("ui-special-data", './assets/spine/ui/special.json')
        this.load.spineAtlas("ui-special-atlas", './assets/spine/ui/ui_special.atlas')
        this.load.image('ui-move-seg', './assets/images/ui_move_seg.svg')

        this.load.spineBinary("degamer-data", './assets/spine/degamers/degamer.json')
        this.load.spineAtlas("degamer-atlas", './assets/spine/degamers/degamers.atlas')
        this.load.spineBinary("degamer-roll-seg-data", './assets/spine/ui/roll_seg.json')
        this.load.spineAtlas("degamer-roll-seg-atlas", './assets/spine/ui/degamer_roll_segment.atlas')

        if (isDemo) {
            this.load.image('player1-avatar', defaultAvatarUrl)
            this.load.image('player2-avatar', defaultAvatarUrl)
        } else {
            this.load.image('player1-avatar', `${import.meta.env.VITE_API_URL}/v1/degamers/image/${props.arena.player1.tokenId}`)
            this.load.image('player2-avatar', `${import.meta.env.VITE_API_URL}/v1/degamers/image/${props.arena.player2.tokenId}`)
        }

        this.load.on('complete', () => {
            isLoading.value = false
            emit('complete')
        })

    }

    function create() {
        
        
        ui.value.top = this.make.spine({ x: DEFAULT_WIDTH / 2, y: 0, dataKey: "ui-data", atlasKey: "ui-atlas" })
        ui.value.top.animationState.timeScale = 0.5
        ui.value.top.animationState.setAnimation(0, "main", true)
        this.add.existing(ui.value.top)

        ui.value.statusText = this.add.text(CENTER_W, CENTER_H, 'Who starts?', { font: '16px Orbitron', fill: '#ffffff' })
        ui.value.statusText.setOrigin(0.5, 0.5)
        ui.value.statusText.setDepth(10)

        ui.value.timer = this.add.text(CENTER_W, CENTER_H, props.timer, { font: '40px Orbitron', fill: '#ffff00' }).setFontStyle('bold')
        ui.value.timer.setOrigin(0.5, 0.5)
        ui.value.timer.setDepth(10)

        ui.value.bottom = this.make.spine({ x: DEFAULT_WIDTH / 2, y: DEFAULT_HEIGHT, dataKey: "ui-b-data", atlasKey: "ui-b-atlas" })
        ui.value.bottom.animationState.timeScale = 0.5
        ui.value.bottom.animationState.setAnimation(0, "main", true)
        ui.value.bottom.setDepth(8)
        ui.value.bottom.skeleton.setSkinByName('icon_none')
        ui.value.bottom.skeleton.setToSetupPose()
        this.add.existing(ui.value.bottom)        

        ui.value.damageText = this.add.text(CENTER_W, CENTER_H, ``, { font: '32px Orbitron', fill: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(10)
        ui.value.mainMsg = this.add.text(CENTER_W, CENTER_H, ``, { font: '36px Orbitron', fill: '#ffff00' }).setOrigin(0.5, 0.5).setDepth(10).setFontStyle('bold').setAlpha(0)

        showMainText = (text) => {

            ui.value.mainMsg.setText(text)
            const tween = this.tweens.add({
                targets: ui.value.mainMsg,
                props: {
                    alpha: { value: 1, duration: 500, ease: 'Linear' },
                    y: { value: '-=100', duration: 1000, ease: 'Linear' }
                },
                ease: 'Linear',
                repeat: 0,
                yoyo: true,
                paused: true
            })

            tween.play()
        }

        createPlayer.call(this, 'player1')
        createPlayer.call(this, 'player2')

        
    }

    function update(time, delta) {

        alignObject(ui.value.timer, ui.value.top, 'main_screen', 0, -20, false, false, true)
        alignObject(ui.value.statusText, ui.value.top, 'main_screen', 0, 20, false, false, true)
        alignObject(ui.value.damageText, ui.value.bottom, 'ui_damage_val_screen', 0, 0, false, false, true)

        alignObject(ui.value.player1.topBarGroup, ui.value.top, 'player1_screen', 0, 0, true, false, true)
        alignObject(ui.value.player2.topBarGroup, ui.value.top, 'player2_screen', 0, 0, true, false, true)

        alignObject(ui.value.player1.specialPercent, ui.value.bottom, 'ui_bottom_small_p1', 0, 0, true, false, true)
        alignObject(ui.value.player2.specialPercent, ui.value.bottom, 'ui_bottom_small_p2', 0, 0, true, false, true)
        alignObject(ui.value.player1.special, ui.value.bottom, 'ui_bottom_small_p1', 0, 0, true, false, true)
        alignObject(ui.value.player2.special, ui.value.bottom, 'ui_bottom_small_p2', 0, 0, true, false, true)

        alignObject(ui.value.player1.moves, ui.value.top, 'player1_add', -1, -1, true, false, true)
        alignObject(ui.value.player2.moves, ui.value.top, 'player2_add', 1, -1, true, false, true)

        if (ui.value.timer && props.arena.status == 0){ 
            ui.value.timer.setText(props.timer)
        }

        const player1_roll_bone = findBoneByName(players.value['player1'], 'roll')
        if (player1_roll_bone) {
            ui.value['player1'].rollSegments.x = players.value['player1'].x - 12 - player1_roll_bone.worldX / 2
            ui.value['player1'].rollSegments.y = players.value['player1'].y - 15 + player1_roll_bone.worldY / 2
            ui.value['player1'].rollSegments.rotation = Phaser.Math.DegToRad(player1_roll_bone.rotation)
        }

        const player2_roll_bone = findBoneByName(players.value['player2'], 'roll')
        if (player2_roll_bone) {
            ui.value['player2'].rollSegments.x = players.value['player2'].x + 12 + player2_roll_bone.worldX / 2
            ui.value['player2'].rollSegments.y = players.value['player2'].y - 15 + player2_roll_bone.worldY / 2
            ui.value['player2'].rollSegments.rotation = Phaser.Math.DegToRad(player2_roll_bone.rotation) * -1
        }

    }

    onMounted(() => {
        game.value = new Phaser.Game(phaserConfig)
    })

    onUnmounted(() => {

        if (game.value) {
            game.value.destroy(true)
            game.value = null
        }
        
    })

    watch([() => props.arena, () => isLoading.value], ([newState, newIsLoading], [oldState, oldIsLoading]) => {

        if (newState){
            if (newIsLoading){
                const unwatch = watch(isLoading, (newLoading) => {
                    if (!newLoading) {
                        if(newState.status == 1){ startRPSAnimation() }
                        unwatch()
                    }
                })
            } else {
                if(newState.status == 1){ startRPSAnimation() }
            }
        }

    }, { deep: true })

    const isI = (player)  => {
        return (props.arena.player1.address == address.value && player == 'player1') || props.arena.player2.address == address.value && player == 'player2'
    }

    /* ------- functions ------- */

    function findBoneByName(spineObj, boneName) {
        if (spineObj && spineObj.skeleton && spineObj.skeleton.bones) {
            for (let bone of spineObj.skeleton.bones) {
                if (bone.data.name === boneName) {
                    return bone
                }
            }
        }
        return null
    }

    function alignObject(object, parent, bone, offsetX, offsetY, invertX, invertY, invertRotation){
        const parent_bone = findBoneByName(parent, bone)
        if (parent_bone) {
            offsetX = offsetX || 0
            offsetY = offsetY || 0
            const parent_bone_x = !invertX ? parent_bone.x : parent_bone.worldX * -1
            const parent_bone_y = !invertY ? parent_bone.y : parent_bone.worldY * -1
            object.x = parent.x - parent_bone_x + offsetX
            object.y = parent.y - parent_bone_y + offsetY
            object.rotation = !invertRotation ? Phaser.Math.DegToRad(parent_bone.rotation) : Phaser.Math.DegToRad(parent_bone.rotation) * -1
        }
    }

    function createPlayer(player, skin){

        if (props.arena.player1.tokenId && (player == 'player1' || player == 'player2')){

            // create player ui --------------------------------
            ui.value[player] = {}

            playersCurrentBalance.value[player] = props.arena[player].health

            
            const m = player == 'player1' ? 1 : -1
            const xo = player == 'player1' ? 0 : 1
            ui.value[player].hpBar = new Phaser.Geom.Rectangle(-75 * m, -25, 200 * m, 20)
            ui.value[player].points = this.add.graphics({ fillStyle: { color: 0xffff00 } }).fillRectShape(ui.value[player].hpBar)
            ui.value[player].pointsShift = this.add.text(-75 * m, 12, `${playersCurrentBalance.value[player]} HP`, { font: '20px Orbitron', fill: '#ffffff' }).setFontStyle('bold').setOrigin(xo, 0.5)
            ui.value[player].specialPercent = this.add.text(-75 * m, 12, '100%', { font: '30px Orbitron', fill: '#ffffff' }).setFontStyle('bold').setOrigin(0.5, 0.5).setDepth(10).setVisible(false)
            ui.value[player].avatar = this.add.image(-110 * m, -4, player + '-avatar').setScale(0.06, 0.06).setOrigin(0.5, 0.5)
            ui.value[player].topBarGroup = this.add.container(CENTER_W, CENTER_H).setDepth(10).add([ui.value[player].points, ui.value[player].pointsShift, ui.value[player].avatar])
            ui.value[player].moves = createMovesCount.call(this)

            ui.value[player].special = this.make.spine({ x: CENTER_W - 350 * m, y: DEFAULT_HEIGHT - 385, dataKey: "ui-special-data", atlasKey: "ui-special-atlas" })
            ui.value[player].special.animationState.timeScale = 0.5
            ui.value[player].special.animationState.setAnimation(0, "none", true)
            ui.value[player].special.setDepth(9)
            this.add.existing(ui.value[player].special)
            
            // create player --------------------------------
            players.value[player] = {}

            players.value[player] = this.make.spine({ x: CENTER_W - 350 * m, y: DEFAULT_HEIGHT - 385, dataKey: "degamer-data", atlasKey: "degamer-atlas" })
            players.value[player].animationState.timeScale = 0.6
            players.value[player].scaleX = START_SCALE * -1 * m
            players.value[player].scaleY = START_SCALE

            if (props.arena[player].collection === 'demo://degamers'){
                const traits = props.arena[player].traits
                players.value[player].skeleton.setSkinByName(`${traits.type}/head/type_${traits.body}`)
                players.value[player].skeleton.skin.addSkin(players.value[player].skeleton.data.findSkin(`${traits.type}/body/type_${traits.body}`))
                players.value[player].skeleton.skin.addSkin(players.value[player].skeleton.data.findSkin(`${traits.type}/left_hand/type_${traits.body}`))
                players.value[player].skeleton.skin.addSkin(players.value[player].skeleton.data.findSkin(`${traits.type}/clothe/clothe_${traits.clothe}`))
                players.value[player].skeleton.skin.addSkin(players.value[player].skeleton.data.findSkin(`${traits.type}/eyes/eyes_${traits.eyes}`))
                players.value[player].skeleton.skin.addSkin(players.value[player].skeleton.data.findSkin(`${traits.type}/hairs/hairs_${traits.hairs}`))
                players.value[player].skeleton.skin.addSkin(players.value[player].skeleton.data.findSkin(`${traits.type}/mouth/mouth_${traits.mouth}`))
            } else {
                players.value[player].skeleton.setSkinByName(`dummy`)
            }

            players.value[player].skeleton.setToSetupPose()
            players.value[player].animationState.setAnimation(0, "rps", true)
            this.add.existing(players.value[player])

            // add player roll segments --------------------------------
            players.value[player].rollSegments = {}
            for (let i = -2; i < 3; i++) {
                players.value[player].rollSegments[i + 3] = this.make.spine({ x: (i * 107), y: 0, dataKey: "degamer-roll-seg-data", atlasKey: "degamer-roll-seg-atlas" })
                players.value[player].rollSegments[i + 3].animationState.setAnimation(0, "roll", true)
            }

            ui.value[player].rollSegments = this.add.container(CENTER_W, CENTER_H).setDepth(3).setVisible(false)
            ui.value[player].rollSegments.add([
                players.value[player].rollSegments[1],
                players.value[player].rollSegments[2],
                players.value[player].rollSegments[3],
                players.value[player].rollSegments[4],
                players.value[player].rollSegments[5],
            ])

            ui.value[player].rollSegments.scaleY = START_SCALE
            ui.value[player].rollSegments.scaleX = START_SCALE


            ui.value[player].text = this.add.text(CENTER_W - 300 * m, DEFAULT_HEIGHT - 500, 'text', { font: '40px Orbitron', fill: '#ffffff' }).setFontStyle('bold').setOrigin(xo, 0.5).setDepth(10).setAlpha(0)
            ui.value[player].critText = this.add.text(CENTER_W - 300 * m, DEFAULT_HEIGHT - 500, 'text', { font: '36px Orbitron', fill: '#FF0000' }).setFontStyle('bold').setOrigin(xo, 0.5).setDepth(10).setAlpha(0)
            ui.value[player].blockText = this.add.text(CENTER_W - 300 * m, DEFAULT_HEIGHT - 500, 'text', { font: '36px Orbitron', fill: '#BDFF00' }).setFontStyle('bold').setOrigin(xo, 0.5).setDepth(10).setAlpha(0)
            
            
            showDamageText = (player, text) => {

                ui.value[player].text.setText(text)
                const tween = this.tweens.add({
                    targets: ui.value[player].text,
                    props: {
                        alpha: { value: 1, duration: 500, ease: 'Linear' },
                        y: { value: '-=100', duration: 1000, ease: 'Linear' }
                    },
                    ease: 'Linear',
                    repeat: 0,
                    yoyo: true,
                    paused: true
                })

                tween.play()
            }

            showCritText = (player, text) => {

                ui.value[player].critText.setText(text)
                const tween = this.tweens.add({
                    targets: ui.value[player].critText,
                    props: {
                        alpha: { value: 1, duration: 500, ease: 'Linear' },
                        y: { value: '-=100', duration: 1000, ease: 'Linear' }
                    },
                    ease: 'Linear',
                    repeat: 0,
                    yoyo: true,
                    paused: true
                })

                tween.play()
            }

            showBlockText = (player, text) => {

                ui.value[player].blockText.setText(text)
                const tween = this.tweens.add({
                    targets: ui.value[player].blockText,
                    props: {
                        alpha: { value: 1, duration: 500, ease: 'Linear' },
                        y: { value: '-=100', duration: 1000, ease: 'Linear' }
                    },
                    ease: 'Linear',
                    repeat: 0,
                    yoyo: true,
                    paused: true
                })

                tween.play()
            }



        }  

    }

    function createMovesCount(){

        const object = this.add.container(CENTER_W, CENTER_H)
        object.setDepth(10)
        object.add([
            this.add.image(-40, 0, 'ui-move-seg'),
            this.add.image(0, 0, 'ui-move-seg'),
            this.add.image(40, 0, 'ui-move-seg')
        ])

        return object
    }

    function startRPSAnimation(){

        players.value.player1.animationState.addListener({
            event: (entry, event) => {
                if (event.data.name == 'rps_play'){

                    if (props.arena.moves){
                        showMainText( isI(props.arena.moves[0].from) ? 'Your move!' : 'Player2 move!' ) 
                        setTimeout(() => { players.value[props.arena.moves[0].from].animationState.setAnimation(0, `rps_win`, true) }, 1000)
                        setTimeout(() => { players.value[props.arena.moves[0].to].animationState.setAnimation(0, `rps_loss`, false) }, 1000)
                    }

                    ui.value.timer.setText('RPS')
                    ui.value.statusText.setText('Who starts?')

                    
                    players.value.player1.animationState.clearListeners()
                    setTimeout(() => {

                        players.value.player1.animationState.setAnimation(0, `idle`, true)
                        players.value.player2.animationState.setAnimation(0, `idle`, true)
                        startAttacks()

                    }, 3000)
                }
            }  
        })

        showMainText('Who starts?')

        setTimeout(() => {

            players.value.player1.animationState.setAnimation(0, `rps_${props.arena.player1.figure}`, false)
            players.value.player2.animationState.setAnimation(0, `rps_${props.arena.player2.figure}`, false)

        }, 1000)

    }

    async function startAttacks(){

        if (props.arena.status == 2){

            let attacksCounter = {
                player1: 0,
                player2: 0
            }

            for (const attack of props.arena.moves) {

                attacksCounter[attack.from]++

                ui.value.timer.setText('BATTLE!')
                ui.value.statusText.setText(`${attack.from} move!`.toUpperCase())

                if ( attacksCounter[attack.from] == 1 ){ ui.value[attack.from].moves.list[0].setVisible(false) }
                if ( attacksCounter[attack.from] == 2 ){ ui.value[attack.from].moves.list[1].setVisible(false) }
                if ( attacksCounter[attack.from] == 3 ){ ui.value[attack.from].moves.list[2].setVisible(false) }

                await setupAnimationListener(attack)
            }

            emit('result')

            players.value['player1'].animationState.setAnimation(0, `idle`, true)
            players.value['player2'].animationState.setAnimation(0, `idle`, true)

        }

    }

    function setupAnimationListener(attack) {
        
        return new Promise(resolve => {

            players.value[attack.from].animationState.addListener({
                event: (entry, event) => {
                    if (event.data.name == 'damage' && attack.damage > 0) {
                        players.value[attack.to].animationState.setAnimation(0, `damage/${attack.spell}`, false)
                        setTimeout(() => {

                            ui.value[attack.to].text.setColor(attack.isCrit ? '#FF0000' : '#FFFFFF')
                            
                            showDamageText(attack.to, attack.totalDamage)
                            if (attack.isCrit) { setTimeout(() => { showCritText(attack.to, `${attack.critMul}X CRIT!`) }, 500) }
                            if (attack.isBlock) { setTimeout(() => { showBlockText(attack.to, `BLOCKED ${attack.blockPersent}%`) }, 1000) }

                            //playersCurrentBalance.value[attack.from] += attack.totalDamage
                            playersCurrentBalance.value[attack.to] -= attack.totalDamage
                            
                            //ui.value[attack.from].points.setText(playersCurrentBalance.value[attack.from])
                            //ui.value[attack.to].points.setText(playersCurrentBalance.value[attack.to])

                            const oldHp = playersCurrentBalance.value[attack.to] + attack.totalDamage
                            const newHp = playersCurrentBalance.value[attack.to]
                            
                            const newWidth = ui.value[attack.to].hpBar.width / 100 * (100 - (100 / oldHp * attack.totalDamage))
                            ui.value[attack.to].hpBar.setSize(newWidth, 20)
                            ui.value[attack.to].points.clear()
                            ui.value[attack.to].points.fillRectShape(ui.value[attack.to].hpBar)

                            //playersCurrentWins.value[attack.from] = playersCurrentBalance.value[attack.from] - props.arena[attack.from].balance
                            playersCurrentWins.value[attack.to] = playersCurrentBalance.value[attack.to] - props.arena[attack.to].health

                            //playersCurrentBalanceShift.value[attack.from] = (100 / props.arena[attack.from].health * playersCurrentWins.value[attack.from]).toFixed(2)
                            playersCurrentBalanceShift.value[attack.to] = (100 / props.arena[attack.to].health * playersCurrentWins.value[attack.to]).toFixed(2)

                            //const persentFrom = playersCurrentBalanceShift.value[attack.from]
                            //const persentTo = playersCurrentBalanceShift.value[attack.to]

                            //ui.value[attack.from].pointsShift.setText( persentFrom > 0 ? `+${persentFrom}%` : `${persentFrom}%`)
                            ui.value[attack.to].pointsShift.setText( `${playersCurrentBalance.value[attack.to]} HP`)
                            ui.value[attack.to].pointsShift.setColor(playersCurrentBalance.value[attack.to] < 1000 ? '#FF0000' : '#FFFFFF')
                            //ui.value[attack.from].pointsShift.setColor(persentFrom > 0 ? '#ADFF00' : (persentFrom < 0 ? '#FF0000' : '#FFFFFF'))
                            //ui.value[attack.to].pointsShift.setColor(props.arena[attack.to].health > 0 ? '#ADFF00' : (persentTo < 0 ? '#FF0000' : '#FFFFFF'))

                        
                        }, 500);
                    }

                    rollHandler(event.data.name, attack.from, attack.crit)
                    if (event.data.name == 'roll_end'){

                        
                        ui.value[attack.to].specialPercent.setVisible(true).setText(`${attack.blockPersent}%`)
                        const blockSpecial = attack.isBlock ? "show_block" : "show_block_null"
                        ui.value[attack.to].special.animationState.setAnimation(0, blockSpecial, false)

                        ui.value[attack.from].specialPercent.setVisible(true).setText(`x${attack.critMul}`)
                        const critSpecial = attack.isCrit ? "show_crit" : "show_crit_null"
                        ui.value[attack.from].special.animationState.setAnimation(0, critSpecial, false)
                        
                        ui.value.bottom.animationState.setAnimation(0, "roll", true)
                        const damageAnimation = setInterval(() => { ui.value.damageText.setText(getRandomNumber(1250, 9540, 1)) }, 10)
                        setTimeout(() => {

                            let damageCurrent = 0
                            clearInterval(damageAnimation)
                            const damageInterval = setInterval(() => {
                                if (damageCurrent >= attack.damage){
                                    clearInterval(damageInterval)
                                    ui.value.damageText.setText(attack.damage)
                                } else {
                                    ui.value.damageText.setText(damageCurrent)
                                    damageCurrent = damageCurrent + 100
                                }
                            }, 10)
                            
                            ui.value.bottom.animationState.setAnimation(0, attack.spell, false)
                            setTimeout(() => {
                                players.value[attack.from].animationState.setAnimation(0, `attack/${attack.spell}`, false)
                            }, 1000)

                        }, 3000)

                    }
                    
                },
                complete: (entry) => {
                    if (entry.animation.name.startsWith('attack')){
                        players.value[attack.from].animationState.setAnimation(0, `idle`, true)
                        players.value[attack.from].animationState.clearListeners()
                    }
                },
            })

            players.value[attack.to].animationState.addListener({
                event: (entry, event) => {
                    rollHandler(event.data.name, attack.to, attack.block)
                },
                complete: (entry) => {
                    if (entry.animation.name.startsWith('damage')){
                        players.value[attack.to].animationState.setAnimation(0, `idle`, true)
                        players.value[attack.to].animationState.clearListeners()
                        setTimeout(() => {
                            resolve()
                        }, 500)
                    }
                },
            })

            
            
            players.value[attack.from].animationState.setAnimation(0, 'roll', false)
            setTimeout(() => {
                players.value[attack.to].animationState.setAnimation(0, 'roll', false)
            }, 1000);

        })

    }

    function rollHandler(event, player, result){
        if (event == 'roll_start'){
            setRollResult(player, [0,0,0,0,0])
            ui.value[player].rollSegments.setVisible(true)
            ui.value[player].specialPercent.setVisible(false)

            ui.value[player].special.animationState.setAnimation(0, 'raffle', true)

        } else if (event == 'roll_end'){
            setRollResult(player, result)
        }
    }

    function setRollResult(player, values){
        for (const [i, value] of values.entries()) {
            if (value == 0) {
                players.value[player].rollSegments[ i + 1 ].animationState.setAnimation(0, `roll`, true)
            } else {
                players.value[player].rollSegments[ i + 1 ].animationState.setAnimation(0, `val${value}`, false)
            }
        }
    }

    function getRandomNumber(min, max, step) {
        const numberOfSteps = Math.floor((max - min) / step + 1)
        const randomStep = Math.floor(Math.random() * numberOfSteps)
        return min + randomStep * step
    }

</script>

<template>
    <div>
        <div v-if="isLoading" class="absolute">
            
        </div>
        <div id="arena-container" class="container w-full h-full border-main border-2 rounded-xl pointer-events-none flex items-center justify-center gap-10" :style="isLoading ? `opacity: 0;` : `opacity: 1;`">
            <div class="absolute w-1/2 grid grid-cols-2 gap-10 items-center justify-center text-center">
            </div>
        </div>
    </div>
</template>

<style scoped>
#arena-container{
    background: url('@/assets/bg_arena_default.svg') center center;
}
@keyframes show {
    
}
</style>