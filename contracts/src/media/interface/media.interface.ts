import { MediaTypeEnum } from "@/media/enum/media-type.enum";
import { MediaFormatEnum } from "@/media/enum/media-format.enum";

export interface MediaInterface {
    url: string;
    type: MediaTypeEnum;
    format: MediaFormatEnum;
}