import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {FileUploadModule} from "ng2-file-upload";
import { XlsxFileUploadComponent } from './xlsx-file-upload/xlsx-file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    XlsxFileUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
