import { Component } from '@angular/core';
import * as docx from 'docx-preview';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: File | null = null;
  fileType: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileType = this.selectedFile.type;

      if (this.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || this.fileType === 'application/msword') {
        const container = document.getElementById('docx-container');
        if (container) {
          container.innerHTML = ''; // Clear previous content
          const reader = new FileReader();
          reader.onload = async (e: any) => {
            const arrayBuffer = e.target.result;
            try {
              await docx.renderAsync(arrayBuffer, container);
            } catch (error) {
              console.error('Error rendering document', error);
            }
          };
          reader.readAsArrayBuffer(this.selectedFile);
        }
      }
    }
  }
}