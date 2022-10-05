AFRAME.registerComponent('eightiControlsComponent', {
    schema: {
        'size': {default: 1},  // hologram starting size
    },
    init() {
        const holo = this.el.components.hologram
        this.model = document.getElementById('hologram');
        this.camera = this.el.sceneEl.querySelector('a-camera')
        this.ground = document.getElementById('ground')
        this.el.addEventListener('oncanplay', (evt) => {
            this.prompt.style.display = 'block'
            const scene = this.el.sceneEl
            this.el.setAttribute('visible', true)
            this.model.setAttribute('visible', true)
            this.placeHologram = (event) => {
                const touchPoint = event.detail.intersection.point  // {x: 2.5, y: -5, z: -12}  //
                // const camRot = this.camera.getAttribute('rotation')
                // const thisRot = this.el.getAttribute('rotation')
          
                // const minS = this.data.size / 50
                // const maxS = this.data.size
          
                this.model.setAttribute('position', {x: touchPoint.x, y: 0, z: 5})
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