import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  onLinkClicked() {
    console.log("link clicked");
    window.open('https://natanmaia95.github.io/', "_blank");
  }
}
