export interface DocumentFolder {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date;
}

export interface AppDocument {
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
  createdAt: Date;
  updatedAt: Date;
}
