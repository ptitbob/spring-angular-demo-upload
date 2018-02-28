import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FileInformation} from './file-information';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = `Demo d'upload de fichier`;

  uploadForm: FormGroup;

  file: File;

  fileInformation: FileInformation;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      userFile: null
    })
  }

  selectFile(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log(`file: ${JSON.stringify(this.file.name)}`);
      console.log(`file: ${JSON.stringify(this.file.size)}`);
      this.fileInformation = null;
    }
  }

  sendFile() {
    const httpParams = new HttpHeaders()
      .append('Content-Type', 'multipart/form-data')
      .append('enctype', 'multipart/form-data')
    ;
    const data: FormData = new FormData();
    data.append(`data`, this.file, this.file.name );
    // Pas d'ajout d'header, angular le fait lui même !
    this.httpClient.post(
      '/api/upload',
      data
    )
      .subscribe(value => {
        this.fileInformation = value as FileInformation;
      })
  }
}
