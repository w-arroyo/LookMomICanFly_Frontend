import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/main_components/header/header.component';
import { HomeCarouselComponent } from './components/secondary_components/home-carousel/home-carousel.component';
import { FooterComponent } from './components/secondary_components/footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, HomeCarouselComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LookMomICanFly';
}
