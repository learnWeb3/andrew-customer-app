import { NotificationType } from "./notification-type.enum";

export interface Notification<T> {
  _id: string;
  sender: string | null;
  receivers: string[];
  type: NotificationType;
  accessibleBy: string;
  data: T;
  createdAt: string;
  updatedAt: string;
}
