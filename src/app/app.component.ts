import {Component} from "@angular/core";
import { UploadResult } from './xlsx-file-upload/xlsx-file-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {}

  public xlsxUploaded(result: UploadResult) {
    console.log(result);
  }
}
