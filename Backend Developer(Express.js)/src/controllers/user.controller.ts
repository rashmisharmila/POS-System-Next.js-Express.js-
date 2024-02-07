import express, { Router } from 'express';
import CustomResponse from "../dtos/custom.response";
import UserService from '../services/user.service';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const router: Router = express.Router();

router.get('/getAllUser', async (req, res) => {
    try {
        const user = await UserService.getAllUser()

        res.status(200).send(
            new CustomResponse(200, "All user Details", user)
        )
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }

});

router.post('/saveUser', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 8)
    try {
        const user = await UserService.saveUser(req.body, hashedPassword);
        res.status(200).send(
            new CustomResponse(200, "Save User Details", user)
        );
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/:id', async (req, res) => {
    const userId: number = parseInt(req.params.id, 10);
    const affecedRows = await UserService.deleteUser(userId);

    if (affecedRows == 0) {
        new CustomResponse(404, "Tray Again.Can't delete this..!" + userId);
    } else {
        res.status(200).send(
            new CustomResponse(200, "deleted successfully.")
        )
    }
});

router.post('/auth', async (req, res) => {
    try {
        const user = await UserService.authUser(req.body);
        if (user) {
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                user.password = '';
                const expiresIn = '1w';
                jwt.sign({ user }, process.env.SECRET as Secret, { expiresIn }, (err: any, token: any) => {
                    if (err) {
                        res.status(500).send({
                            statusCode: 500,
                            message: 'Something went wrong',
                        });
                    } else {
                        const res_body = {
                            user: user,
                            accessToken: token,
                        };
                        res.status(200).send({
                            statusCode: 200,
                            message: 'Access',
                            data: res_body,
                        });
                    }
                });
            } else {
                res.status(401).send({
                    statusCode: 401,
                    message: 'Invalid credentials',
                });
            }
        } else {
            res.status(404).send({
                statusCode: 404,
                message: 'User not found',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            statusCode: 500,
            message: 'Error',
        });
    }
});

export default router