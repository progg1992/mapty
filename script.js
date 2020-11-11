'use strict';
const leaflet = require('leaflet');
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    #map;
    #mapEvent;
    constructor() {
        this.getPosition;
        form.addEventListener('submit', this.newWorkout.bind(this));
        inputType.addEventListener('change', this.toggleElevationField)
    }

    getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.loadMap().bind(this), function() {
                alert('Could not get your position')
            })
        }
    }

    loadMap(position) {
        const {latitude} = position.coords
        const {longitude} = position.coords
        const coords = [latitude, longitude]
            
        this.#map = L.map('map').setView(coords, 13);
            
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on('click', this.showForm.bind(this))
    }

    showForm(mapE) {
        this.#mapEvent = mapE;
            form.classList.remove('hidden');
            inputDistance.focus();
    }

    toggleElevationField() {
        inputElevation.closest('.form_row').classList.toggle('form_row--hidden');
        inputElevation.closest('.form_row').classList.toggle('form_row--hidden');
    }

    newWorkout(e) {
        e.preventDefault();
        
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        
        const {lat, lng} = this.#mapEvent.latlng;
        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup',
            }))
            .setPopupContent('Workout')
            .openPopup()
    }
}

const app = new App()
