import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Restaurant extends Document {
  @Prop({ type: String, required: true })
  arabicName: string;

  @Prop({ type: String, required: true })
  englishName: string;

  @Prop({ type: String, required: true, unique: true })
  slug: string;

  @Prop({
    type: [String],
    required: true,
    validate: [arrayLimit, 'array can only have 1 to 3 elements'],
  })
  cuisines: string[];

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };
}

function arrayLimit(val: string[]) {
  return val.length >= 1 && val.length <= 3;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
RestaurantSchema.index({ location: '2dsphere' });
