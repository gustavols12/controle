export interface TicketProps {
  id: string;
  name: string;
  status: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  customerId: string | null;
  description: string;
  userId: string | null;
}
