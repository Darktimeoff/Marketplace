import { Module } from "@nestjs/common";
import { BrandDataloader } from "./dataloader/brand.dataloader";
import { BrandDataloaderService } from "./service/brand-dataloader.service";
import { BrandFacade } from "./facade/brand.facade";

@Module({
    providers: [
        BrandDataloader,
        BrandDataloaderService,
        BrandFacade
    ],
    exports: [
        BrandFacade
    ]
})
export class BrandModule {}