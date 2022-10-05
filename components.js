AFRAME.registerComponent('eightiControlsComponent', {
    schema: {
        'size': {default: 1},  // hologram starting size
    },
    init() {
        const holo = this.el.components.hologram
        this.camera = this.el.sceneEl.querySelector('a-camera')
        this.ground = document.getElementById('ground')
        this.el.addEventListener('oncanplay', (evt) => {
            this.prompt.style.display = 'block'
            const scene = this.el.sceneEl
            this.el.setAttribute('visible', true)
            this.placeHologram = (event) => {
                // place at touchpoint
                const touchPoint = event.detail.intersection.point
                this.el.setAttribute('position', touchPoint)
                const camRot = this.camera.getAttribute('rotation')
                const thisRot = this.el.getAttribute('rotation')
                this.el.setAttribute('rotation', `${thisRot.x} ${camRot.y} ${thisRot.z}`)
                // animate hologram in from a small scale to its end scale
                const minS = this.data.size / 50
                const maxS = this.data.size
                this.el.setAttribute('scale', `${minS} ${minS} ${minS}`)
                this.el.setAttribute('animation', {
                    property: 'scale',
                    to: `${maxS} ${maxS} ${maxS}`,
                    easing: 'easeOutElastic',
                    dur: 500,
                    delay: 100,
                })
                // Commands can be sent directly to the hologram component to control playback:
                // 'play()'
                // 'pause()'
                this.el.components.hologram.play()
                // Only show the progress bar if this is not a live broadcast
                if (holo.duration !== Infinity) this.progress.style.display = 'block'
                this.ground.setAttribute('visible', true)
            }
            this.ground.addEventListener('mousedown', this.placeHologram, {once: true})
        }, {once: true})
    },
    tick() {       
        const holo = this.el.components.hologram
        if (holo && holo.duration !== Infinity && !holo.paused && this.playProgress != null) {
        this.playProgress.style.display = 'block'
        // Playback progress can be tracked using the 'currentTime' and 'duration' getters.
        this.playProgress.style.width =
            `${(100 * (holo.currentTime / holo.duration))}%`
        }
    },
});