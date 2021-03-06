import { Injectable } from '@angular/core';
import { Member } from './member.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class MemberService {
  members: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.members = angularFire.database.list('members');
}

  getMembers() {
    return this.members;
  }

  addMember(newMember: Member) {
    this.members.push(newMember);
  }

  deleteMember(localMemberToDelete){
    var memberEntryInFirebase = this.getMemberById(localMemberToDelete.$key);
    memberEntryInFirebase.remove();
  }

  getMemberById(memberId: string){
    return this.angularFire.database.object('/members/' + memberId);
  }

  updateMember(localUpdatedMember){
    var memberEntryInFirebase = this.getMemberById(localUpdatedMember.$key);
    memberEntryInFirebase.update({name: localUpdatedMember.name,
                                awards: localUpdatedMember.awards,
                                details: localUpdatedMember.details,
                                image: localUpdatedMember.image,
                                yearsActive: localUpdatedMember.yearsActive,
                                country: localUpdatedMember.country,
                                genre: localUpdatedMember.genre});
  }
}
