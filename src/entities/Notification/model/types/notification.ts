export interface Notification {
  _id: string;
  title: string;
  content: string;
  type: string;
  recipients: string[];
  roles: string[];
  isRead: boolean;
  timestamp: Date;
  href?: string;
}
