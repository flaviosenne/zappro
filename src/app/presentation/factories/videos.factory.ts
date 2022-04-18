import { ManageVideoService } from '../../domain/usecases/videos/manage-video';
import { UserRepositoryImpl } from '../../infra/repositories/impl/user-repository-impl';
import { ManageVideoRepositoryImpl } from './../../infra/repositories/impl/manage-video-repository-impl';
import { ManageVideoController } from './../controllers/manage-videos.controller';

export class VideosFactory {

    static getManageVideoControllerInstance() {
        return new ManageVideoController(
            VideosFactory.getManageVideoServiceInstance()
        )
    }

    static getManageVideoServiceInstance() {
        return new ManageVideoService(
            new ManageVideoRepositoryImpl(),
            new UserRepositoryImpl()
        )
    }
}