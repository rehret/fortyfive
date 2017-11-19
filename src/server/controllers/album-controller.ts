import { JsonController, Get, Post, Ctx, Body, Param } from "routing-controllers";
import { IRouterContext } from "koa-router";
import { createConnection } from "typeorm";
import { Album } from "../../shared/entity/album";
import { Routes } from "../constants/routes";

@JsonController(Routes.ApiAlbumRoutePrefix)
export class AlbumController {
    @Get()
    public async GetAlbums(@Ctx() ctx: IRouterContext): Promise<Album[]> {
        try {
            const connection = await createConnection();
            const albumRepository = connection.getRepository(Album);
            const albums = await albumRepository.find();
            connection.close();
            return albums;
        } catch (err) {
            throw ctx.throw(err);
        }
    }

    @Post()
    public async CreateAlbum(@Ctx() ctx: IRouterContext, @Body({ required: true }) album: Album): Promise<Album> {
        try {
            const connection = await createConnection();
            const albumRepository = connection.getRepository(Album);
            await albumRepository.save(album);
            connection.close();
            return album;
        } catch (err) {
            throw ctx.throw(err);
        }
    }

    @Get("/:id")
    public async GetAlbum(@Ctx() ctx: IRouterContext, @Param("id") id: number): Promise<Album | undefined> {
        try {
            const connection = await createConnection();
            const albumRepository = connection.getRepository(Album);
            const album = await albumRepository.findOneById(id);
            connection.close();
            return album;
        } catch (err) {
            throw ctx.throw(err);
        }
    }
}
