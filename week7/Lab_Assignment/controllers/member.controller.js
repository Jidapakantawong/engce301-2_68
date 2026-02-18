const MemberService = require('../services/member.service');

class MemberController {

    // GET /api/members
    static async getAllMembers(req, res, next) {
        try {
            const members = await MemberService.getAllMembers();
            res.json({ success: true, data: members });
        } catch (err) {
            next(err);
        }
    }

    // GET /api/members/:id
    static async getMemberById(req, res, next) {
        try {
            const member = await MemberService.getMemberById(req.params.id);
            res.json({ success: true, data: member });
        } catch (err) {
            res.status(404).json({ success: false, error: err.message });
        }
    }

    // POST /api/members
    static async createMember(req, res, next) {
        try {
            const result = await MemberService.createMember(req.body);
            res.status(201).json({
                success: true,
                message: 'Member created successfully',
                data: result
            });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    // PUT /api/members/:id
    static async updateMember(req, res, next) {
        try {
            const result = await MemberService.updateMember(req.params.id, req.body);
            res.json({
                success: true,
                message: 'Member updated successfully',
                data: result
            });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
}

module.exports = MemberController;