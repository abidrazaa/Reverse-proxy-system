import { Schema, model, Document } from 'mongoose';

export interface ILog extends Document {
  method: string;
  url: string;
  timestamp: Date;
}

const LogSchema = new Schema<ILog>({
  method: { type: String, required: true },
  url: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

export default model<ILog>('Log', LogSchema);
