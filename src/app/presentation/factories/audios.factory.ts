import { UserRepositoryImpl } from '../../infra/repositories/impl/user-repository-impl';
import { ManageAudioService } from './../../domain/usecases/audios/manage-audio';
import { ManageAudioRepositoryImpl } from './../../infra/repositories/impl/manage-audio-repository-impl';
import { ManageAudioController } from './../controllers/manage-audios.controller';

export class AudiosFactory {

    static getManageAudioControllerInstance() {
        return new ManageAudioController(
            AudiosFactory.getManageAudioServiceInstance()
        )
    }

    static getManageAudioServiceInstance() {
        return new ManageAudioService(
            new ManageAudioRepositoryImpl(),
            new UserRepositoryImpl()
        )
    }
}