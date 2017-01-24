import {Component} from "@angular/core";
import {FileUploader} from "ng2-file-upload/ng2-file-upload";
import {read, IWorkBook} from "ts-xlsx";
import {IWorkSheet} from "xlsx";
import {Observable} from "rxjs";

const URL = 'https://foo.bar.com';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public fileDropped(files: File[]): void {
    console.log(`number of files: ${files.length}`);
    console.log(typeof files[0]);

    Observable.from(files)
      .switchMap((file: File) => {
        console.log(`switchMap file: ${file.name}`);
        return new Observable<any>((observer) => {
          console.log("foo");
          let reader: FileReader = new FileReader();
          reader.onload = (e) => {
            console.log(`reader.onload`);
            observer.next((e.target as any).result);
          };

          reader.readAsBinaryString(file);
          return () => {
            reader.abort();
          };
        });
      }).map((value: string) => {
      console.log(`read`);
      return read(value, {type: 'binary'});
    }).map((wb: IWorkBook) => {
      return wb.SheetNames.map((sheetName: string) => {
        let sheet: IWorkSheet = wb.Sheets[sheetName];
        console.log("Found sheet");
      });
    }).map((results: Array<any>) => {
      return {result: 'success', payload: results};
    });
  }
}
