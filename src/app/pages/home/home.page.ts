import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import { IonHeader, IonButton, IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    CommonModule
  ]
})
export class HomePage implements OnInit {
  foto: string | undefined;

  constructor() {}

  ngOnInit() {
    this.initializePush();
  }

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.foto = image.dataUrl!;
    } catch (error) {
      alert('Error al tomar foto: ' + error);
    }
  }

  async obtenerUbicacion() {
    try {
      const position = await Geolocation.getCurrentPosition();
      alert(`Latitud: ${position.coords.latitude}, Longitud: ${position.coords.longitude}`);
    } catch (error) {
      alert('Error al obtener ubicación: ' + error);
    }
  }

  verificarHuella() {
    alert('Función de huella solo disponible en dispositivo real.');
  }

  initializePush() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration', token => {
      console.log('Push token:', token.value);
    });

    PushNotifications.addListener('pushNotificationReceived', notification => {
      alert('Notificación recibida: ' + notification.title);
    });
  }
}