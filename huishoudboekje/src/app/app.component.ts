import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/dashboard/header/header.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [HeaderComponent, RouterOutlet],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    title = "huishoudboekje";
}
