import { ChangeDetectionStrategy, Output, EventEmitter, Component, OnDestroy, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload/ng2-file-upload";
import {read, IWorkBook} from "ts-xlsx";
import {IWorkSheet} from "xlsx";
import {Observable, Subject, Subscription} from "rxjs";

const URL = 'https://foo.bar.com';

export interface UploadResult {
  result: "failure" | "success";
  payload: any;
}

@Component({
  selector: 'xlsx-file-upload',
  templateUrl: './xlsx-file-upload.component.html',
  styleUrls: ['./xlsx-file-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XlsxFileUploadComponent implements OnInit, OnDestroy {
  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  private subscription: Subscription;
  private filesSubject: Subject<File>;
  private _uploadedXls: Observable<{ result: string, payload: any }>;

  @Output()
  public uploadedXls: EventEmitter<UploadResult> = new EventEmitter();

  constructor() {
    this.filesSubject = new Subject();
    this._uploadedXls = this.filesSubject.asObservable()
      .switchMap((file: File) => {
        return new Observable<any>((observer) => {
          let reader: FileReader = new FileReader();
          reader.onload = (e) => {
            observer.next((e.target as any).result);
          };

          reader.readAsBinaryString(file);
          return () => {
            reader.abort();
          };
        })
        .map((value: string) => {
          return read(value, {type: 'binary'});
        }).map((wb: IWorkBook) => {
          return wb.SheetNames.map((sheetName: string) => {
            let sheet: IWorkSheet = wb.Sheets[sheetName];
            return sheet;
          });
        }).map((results: Array<any>) => {
          return {result: 'success', payload: results};
        })
        .catch(e => Observable.of({result: 'failure', payload: e}));
      });
  }

  ngOnInit() {
    this.subscription = this._uploadedXls.subscribe(this.uploadedXls);
  }

  ngOnDestroy() {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public fileDropped(files: FileList): void {
    for ( let i = 0 ; i < files.length ; i ++ ) {
      this.filesSubject.next(files[i]);
    }
  }
}
