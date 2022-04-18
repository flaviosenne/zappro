import { ManageMessageService } from '../../domain/usecases/messages/manage-messages';
import { ManageMessagesRepositoryImpl } from '../../infra/repositories/impl/manage-message-repository-impl';
import { UserRepositoryImpl } from '../../infra/repositories/impl/user-repository-impl';
import { ManageMessageController } from '../controllers/manage-messages.controller';

export class MessagesFactory {

    static getManageMessageControllerInstance() {
        return new ManageMessageController(
            MessagesFactory.getManageMessageServiceInstance()
        )
    }

    static getManageMessageServiceInstance() {
        return new ManageMessageService(
            new ManageMessagesRepositoryImpl(),
            new UserRepositoryImpl()
        )
    }
}