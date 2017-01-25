import {ChangeDetectionStrategy, Component} from "@angular/core";
import { UploadResult } from './xlsx-file-upload/xlsx-file-upload.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public uploaderContent: BehaviorSubject<string> = new BehaviorSubject('please drop file in');
  constructor() {}

  public xlsxUploaded(result: UploadResult) {
    this.uploaderContent.next(JSON.stringify(result));
  }
}
