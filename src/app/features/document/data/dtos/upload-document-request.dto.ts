export interface UploadDocumentRequestDto {
  file: File;
  folderId?: string;
  tags?: string[];
  description?: string;
}
