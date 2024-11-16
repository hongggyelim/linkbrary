import { ReactNode } from "react";

export interface ModalPropType {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  folderName?: string;
  folderId?: number;
  list?: FolderItemType[];
  link?: string;
  linkId?: number | null;
  linkCount?: number;
}

export interface FolderItemType {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
}
