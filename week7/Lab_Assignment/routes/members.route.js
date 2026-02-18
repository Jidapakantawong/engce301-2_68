const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/member.controller');

// GET /api/members
router.get('/', MemberController.getAllMembers);

// GET /api/members/:id
router.get('/:id', MemberController.getMemberById);

// POST /api/members
router.post('/', MemberController.createMember);

// PUT /api/members/:id
router.put('/:id', MemberController.updateMember);

module.exports = router;

