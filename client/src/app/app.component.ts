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

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      filename: '',
      userFile: null
    })
  }

  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadForm.get('filename').setValue(this.file.name);
      console.log(`file: ${JSON.stringify(this.file.name)}`);
      console.log(`file: ${JSON.stringify(this.file.size)}`);
      this.fileInformation = null;
    }
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  sendFile() {
    const data: FormData = new FormData();
    data.append(`data`, this.file, this.file.name );
    // Pas d'ajout d'header exposant le content-type, le framework le fait pour vous.
    this.httpClient.post(
      '/api/upload',
      data
    )
      .subscribe(value => {
        this.fileInformation = value as FileInformation;
      })
  }
}
