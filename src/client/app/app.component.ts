import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ["app.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public title = "Grocery List";
    private signedIn: boolean;

    constructor() {
        this.signedIn = false;
    }

    public isSignedIn(): boolean {
        return this.signedIn;
    }
}
