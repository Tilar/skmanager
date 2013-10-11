/**
 * User: steve
 * Date: 10/10/13
 * Time: 11:49 AM
 */

var skmanager = skmanager || {};

skmanager.buildModal = function(playerCharacters, $modal, $select, $note) {
    if (playerCharacters.length > 0) {
        $select.html('');
        $note.val('');
        // insert items into dropdown
        $select.append('<option value="0">Select character...</option>');
        $.each(playerCharacters, function(i, it){
            $select.append('<option value="' + it.id + '">' + it.name + '</option>');
        });
        // open modal
        $modal.modal();
    } else {
        alert('No available characters');
    }
};

skmanager.addCharacterToRaid = function($select, $note, $modal) {
    $.getJSON('/raid/addCharacter', {raid_id: skmanager.raid.id, pc_id: $select.val(), note: $note.val()}, function(result){
        // handle the result by reloading the page
        $modal.modal('hide');
        window.location = window.location;
    });
};

jQuery(function($){
    var $addCharacterBtn = $('#add-character-btn'),
        $addCharacterModal = $('#add-character-modal'),
        $addCharacterSelect = $('#add-character-select'),
        $modalAddCharacterBtn = $('#modal-add-character-btn'),
        $addCharacterForm = $('#add-character-form'),
        $addCharacterNote = $('#add-character-note');

    $addCharacterBtn.on('click', function(){
        // todo: get the PCs
        $.getJSON('/playerCharacter/availableForRaid', {raid_id: skmanager.raid.id}, function(result){
            skmanager.buildModal(result.playerCharacters, $addCharacterModal, $addCharacterSelect, $addCharacterNote);
        });
    });

    $addCharacterSelect.on('change', function(){
        if ($addCharacterSelect.val() > 0) {
            $modalAddCharacterBtn.attr('disabled', false);
        } else {
            $modalAddCharacterBtn.attr('disabled', true);
        }
    });

    $addCharacterForm.on('submit', function(e){
        // prevent the form from submitting, we only want to process this through ajax
        e.preventDefault();
        if ($addCharacterSelect.val() > 0) {
            skmanager.addCharacterToRaid($addCharacterSelect, $addCharacterNote, $addCharacterModal);
        }
        return false;
    });

    $modalAddCharacterBtn.on('click', function(){
        $addCharacterForm.submit();
    });
});