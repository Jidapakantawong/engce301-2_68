const MemberDB = require('../database/members.db');

class MemberService {

    static async getAllMembers() {
        return await MemberDB.findAll();
    }

    static async getMemberById(id) {
        const member = await MemberDB.findById(id);
        if (!member) {
            throw new Error('Member not found');
        }
        return member;
    }

    static async createMember(memberData) {
        const existing = await MemberDB.findByEmail(memberData.email);
        if (existing) {
            throw new Error('Email already exists');
        }

        return await MemberDB.create(memberData);
    }

    static async updateMember(id, memberData) {
        const member = await MemberDB.findById(id);
        if (!member) {
            throw new Error('Member not found');
        }

        return await MemberDB.update(id, memberData);
    }
}

module.exports = MemberService;