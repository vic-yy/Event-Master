import { NextFunction, Request, Response, Router } from 'express';
import statusCodes from '../../../../utils/constants/statusCode';
import userGroupService from '../services/userGroupService';
import { loginMiddleware, notLoggedInMiddleware, logoutMiddleware, verifyJWT } from '../../../middlewares/auth-middlewares';
import { checkRole } from '../../../middlewares/checkRole';
import { Role } from '../../../../utils/constants/groupRole';

const router = Router();

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_group = await userGroupService.createUserGroup(req.body);
        const protectedUserGroup = await userGroupService.protectUserGroup(user_group);
        res.status(statusCodes.CREATED).send(protectedUserGroup);
    } catch (error) {
        next(error);
    }
});

router.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_groups = await userGroupService.getAllUserGroups();
        const protectedClients = await Promise.all(userGroups.map(async (client:any) => {
            return await userGroupService.protectUserGroup(client);
        }));
        res.status(statusCodes.SUCCESS).json(protectedClients);
    } catch (error) {
        next(error);
    }
});

router.get('/getById/:user_groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_group = await userGroupService.getUserGroupById(Number(req.params.user_groupId));
        const protectedUserGroup = await userGroupService.protectUserGroup(user_group);
        res.status(statusCodes.SUCCESS).send(protectedUserGroup);
    } catch (error) {
        next(error);
    }
});

router.get('/getByUserId/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_groups = await userGroupService.getUserGroupByUserId(Number(req.params.userId));
        const protectedClients = await Promise.all(user_groups.map(async (client:any) => {
            return await userGroupService.protectUserGroup(client);
        }));
        res.status(statusCodes.SUCCESS).json(protectedClients);
    } catch (error) {
        next(error);
    }
});

router.get('/getByGroupId/:groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_groups = await userGroupService.getUserGroupByGroupId(Number(req.params.groupId));
        const protectedClients = await Promise.all(user_groups.map(async (client:any) => {
            return await userGroupService.protectUserGroup(client);
        }));
        res.status(statusCodes.SUCCESS).json(protectedClients);
    } catch (error) {
        next(error);
    }
});

router.get('/getByUserIdGroupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_group = await userGroupService.getUserGroupByUserIdGroupId(Number(req.body.userId), Number(req.body.groupId));
        const protectedUserGroup = await userGroupService.protectUserGroup(user_group);
        res.status(statusCodes.SUCCESS).send(protectedUserGroup);
    } catch (error) {
        next(error);
    }
});

router.put('/update/:user_groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_group = await userGroupService.updateUserGroup(Number(req.params.user_groupId), req.body);
        res.status(statusCodes.SUCCESS).json("User-Group updated successfully");
    } catch (error) {
        next(error);
    }
});

router.put('/updateRole/:user_groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_group = await userGroupService.updateUserGroupRole(Number(req.params.user_groupId), req.body.role);
        res.status(statusCodes.SUCCESS).json("Role updated successfully");
    } catch (error) {
        next(error);
    }
});


router.delete('/delete/:user_groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_group = await userGroupService.deleteUserGroupById(Number(req.params.user_groupId));
        res.status(statusCodes.SUCCESS).send("User-Group deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteByUserId/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_group = await userGroupService.deleteUserGroupByUserId(Number(req.params.userId));
        res.status(statusCodes.SUCCESS).send("User-Groups deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteByGroupId/:groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_group = await userGroupService.deleteUserGroupByGroupId(Number(req.params.groupId));
        res.status(statusCodes.SUCCESS).send("User-Groups deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteByUserIdGroupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_group = await userGroupService.deleteUserGroupByUserIdGroupId(Number(req.body.userId), Number(req.body.groupId));
        res.status(statusCodes.SUCCESS).send("User-Group deleted successfully.");
    } catch (error) {
        next(error);
    }
});
