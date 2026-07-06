export interface DocumentResponseDto {
  id: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  fileType: string;
  folderId?: string;
  folderName?: string;
  tags: string[];
  description?: string;
  url: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}
