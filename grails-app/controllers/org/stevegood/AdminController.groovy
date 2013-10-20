package org.stevegood

import org.stevegood.game.CharacterClass
import org.stevegood.game.CharacterRole
import org.stevegood.game.GameRole
import org.stevegood.game.PlayerCharacter
import org.stevegood.sec.User
import org.stevegood.sec.UserRole
import org.stevegood.sk.Raid
import org.stevegood.sk.RaidMember

class AdminController {

    def index() {
        def rolesWithCharacterCount = []
        def classesWithCharacterCount = []

        GameRole.list()?.each {
            rolesWithCharacterCount << [role: it, characterCount: CharacterRole.countByRole(it)]
        }

        CharacterClass.list()?.each {
            classesWithCharacterCount << [characterClass: it, characterCount: PlayerCharacter.countByCharacterClass(it)]
        }

        [
                userCount: User.count(),
                recentUsers: User.list(sort: 'id', order: 'desc', max: 4),
                userRoleCount: UserRole.count(),
                characterCount: PlayerCharacter.count(),
                raidCount: Raid.count(),
                charactersInRaids: RaidMember.list().collect { it.character }.unique().size(),
                roleCount: GameRole.count(),
                rolesWithCaracterCount: rolesWithCharacterCount,
                classCount: CharacterClass.count(),
                classesWithCharacterCount: classesWithCharacterCount
        ]
    }
}
