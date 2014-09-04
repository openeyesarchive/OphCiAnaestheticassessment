
/* Module-specific javascript can be placed here */

$(document).ready(function() {
	handleButton($('#et_save'),function() {
	});
	
	handleButton($('#et_cancel'),function(e) {
		if (m = window.location.href.match(/\/update\/[0-9]+/)) {
			window.location.href = window.location.href.replace('/update/','/view/');
		} else {
			window.location.href = baseUrl+'/patient/episodes/'+OE_patient_id;
		}
		e.preventDefault();
	});

	handleButton($('#et_deleteevent'));

	handleButton($('#et_canceldelete'));

	handleButton($('#et_print'),function(e) {
		printIFrameUrl(OE_print_url, null);
		enableButtons();
		e.preventDefault();
	});

	$('select.populate_textarea').unbind('change').change(function() {
		if ($(this).val() != '') {
			var cLass = $(this).parent().parent().parent().attr('class').match(/Element.*/);
			var el = $('#'+cLass+'_'+$(this).attr('id'));
			var currentText = el.text();
			var newText = $(this).children('option:selected').text();

			if (currentText.length == 0) {
				el.text(ucfirst(newText));
			} else {
				el.text(currentText+', '+newText);
			}
		}
	});

	$('#Element_OphCiAnaestheticassessment_Examination_height_m').change(function() {
		if ($('#Element_OphCiAnaestheticassessment_Examination_height_m').val() != '') {
			var ft = Math.floor($(this).val() * 0.032808399);
			var inch = Math.round(($(this).val() - (ft / 0.032808399)) * 0.393700787);

			$('#Element_OphCiAnaestheticassessment_Examination_height_ft').val(ft);
			$('#Element_OphCiAnaestheticassessment_Examination_height_in').val(inch);
		}
	});

	$('#Element_OphCiAnaestheticassessment_Examination_height_ft').change(function() {
		if ($('#Element_OphCiAnaestheticassessment_Examination_height_ft').val() != '') {
			$('#Element_OphCiAnaestheticassessment_Examination_height_m').val(Math.round(($('#Element_OphCiAnaestheticassessment_Examination_height_ft').val() * 30.48) + ($('#Element_OphCiAnaestheticassessment_Examination_height_in').val() * 2.54)));
		}
	});

	$('#Element_OphCiAnaestheticassessment_Examination_height_in').change(function() {
		if ($('#Element_OphCiAnaestheticassessment_Examination_height_in').val() != '') {
			$('#Element_OphCiAnaestheticassessment_Examination_height_m').val(Math.round(($('#Element_OphCiAnaestheticassessment_Examination_height_ft').val() * 30.48) + ($('#Element_OphCiAnaestheticassessment_Examination_height_in').val() * 2.54)));
		}
	});

	$('.addInvestigation').click(function(e) {
		e.preventDefault();

		$.ajax({
			'type': 'GET',
			'url': baseUrl+'/OphCiAnaestheticassessment/default/addInvestigation',
			'success': function(html) {
				$('.investigations tbody').append(html);
				$('.investigations tbody tr.no_investigations').hide();
			}
		});
	});

	$('.removeInvestigation').live('click',function(e) {
		e.preventDefault();

		$(this).closest('tr').remove();

		if ($('.investigations tbody tr').length == 1) {
			$('.investigations tbody tr.no_investigations').show();
		}
	});

	$('.investigationType').live('change',function() {
		if ($(this).val() == 'other') {
			$(this).hide();
			$(this).next('input').show().focus();
		}
	});

	$('input[name="ordered[]"][type="checkbox"]').live('click',function() {
		if ($(this).is(':checked')) {
			$(this).prev('input[type="hidden"]').attr('disabled','disabled');
		} else {
			$(this).prev('input[type="hidden"]').removeAttr('disabled');
		}
	});

	$('input[name="reviewed[]"][type="checkbox"]').live('click',function() {
		if ($(this).is(':checked')) {
			$(this).prev('input[type="hidden"]').attr('disabled','disabled');
		} else {
			$(this).prev('input[type="hidden"]').removeAttr('disabled');
		} 
	});

	$('select[id="Element_OphCiAnaestheticassessment_DvtAssessment[exclusion_factors]"]').bind('MultiSelectChanged',function(e) {
		if ($(this).parent().next('ul').children().length == 1) {
			$('#dvt_excluded_fields').slideDown('fast');
		} else {
			$('#dvt_excluded_fields').slideUp('fast');
		}
	});

	$('#risk_factors').bind('MultiSelectChanged',function(e) {
		update_risk_prophylaxis();
	});

	$('#Element_OphCiAnaestheticassessment_Examination_weight_m').change(function() {
		$('#Element_OphCiAnaestheticassessment_Examination_weight_lb').val(parseFloat($(this).val() * 2.20462).toFixed(1));
		update_bmi();
	});

	$('#Element_OphCiAnaestheticassessment_Examination_weight_lb').change(function() {
		$('#Element_OphCiAnaestheticassessment_Examination_weight_m').val(parseFloat($(this).val() / 2.20462).toFixed(1));
		update_bmi();
	});

	$('#Element_OphCiAnaestheticassessment_Examination_weight_m').change(function() {
		update_bmi();
	});

	$('#Element_OphCiAnaestheticassessment_Examination_height_m').change(function() {
		update_bmi();
	});

	$('#Element_OphCiAnaestheticassessment_Examination_blood_glucose_na').click(function() {
		if ($(this).is(':checked')) {
			$('#Element_OphCiAnaestheticassessment_Examination_blood_glucose_m').attr('disabled','disabled');
			$('#Element_OphCiAnaestheticassessment_Examination_blood_glucose_m').val('');
		} else {
			$('#Element_OphCiAnaestheticassessment_Examination_blood_glucose_m').removeAttr('disabled');
		}
	});

	$(this).on('click', '#Element_OphCiAnaestheticassessment_MedicalHistoryReview_healthy_patient' , function(e) {
		e.preventDefault();
		$('.Element_OphCiAnaestheticassessment_MedicalHistoryReview input[type=radio]').each(function(){
			if($(this).val() == 0){$(this).attr('checked', true);$(this).click()}
		});
	});

	$('#Element_OphCiAnaestheticassessment_PatientSpecificPreoperativeEducation_instruction_category_id').change(function(e) {
		update_instructions_list($(this).val());
	});

	$('input[name="Element_OphCiAnaestheticassessment_DvtAssessment[exclusion_criteria_met]"]').click(function(e) {
		if ($(this).val() == '1') {
			$('.exclusionFields').hide();
		} else {
			$('.exclusionFields').show();
		}
	});

	$('.InstructionsProcedureRow').children('td.can_select').click(function(e) {
		if ($(this).closest('tr').children('td:first').children('input').is(':checked')) {
			$(this).closest('tr').children('td:first').children('input').removeAttr('checked');
		} else {
			$(this).closest('tr').children('td:first').children('input').attr('checked','checked');
		}
	});

	$('#category_id').change(function() {
		var category_id = $(this).val();

		$.ajax({
			'type': 'GET',
			'url': baseUrl + '/OphCiAnaestheticassessment/default/instructionList?category_id=' + category_id,
			'success': function(html) {
				$('div[data-field-name="instructions"]').replaceWith(html);
			}
		});
	});

	$(this).on('change', 'select.recordInput', function(e) {
		var selectedCat = $(this).find('option:selected');
		var selectedCatId = $(selectedCat).val();
		var selectedCatName = $(selectedCat).text();

		if(typeof OCA_PatientSpecific_InstructionsByCategoryId[selectedCatId] != 'undefined'){
			$('#instructions').empty()
			$('.MultiSelectList.multi-select-selections').empty()
			$('#instructions').append($('<option/>', {
				value: null,
				text : '- Please select -'
			}));

			for(var x = 0; x < OCA_PatientSpecific_InstructionsByCategoryId[selectedCatId].length; x++){
				$('#instructions').append($('<option/>', {
					value: OCA_PatientSpecific_InstructionsByCategoryId[selectedCatId][x]['id'],
					text : OCA_PatientSpecific_InstructionsByCategoryId[selectedCatId][x]['name']
				}));
			}
		}
	});
});

function ucfirst(str) { str += ''; var f = str.charAt(0).toUpperCase(); return f + str.substr(1); }

function update_bmi()
{
	var bmi = ((parseFloat($('#Element_OphCiAnaestheticassessment_Examination_weight_m').val()) / (parseFloat($('#Element_OphCiAnaestheticassessment_Examination_height_m').val()) / 100) / (parseFloat($('#Element_OphCiAnaestheticassessment_Examination_height_m').val()) / 100)));
	if(!isNaN(bmi)) $('#Element_OphCiAnaestheticassessment_Examination_bmi_m').val(bmi.toFixed(2).replace(/\.0$/,''));
}

function eDparameterListener(_drawing) {
	if (_drawing.selectedDoodle != null) {
		// handle event
	}
}

function medication_in_list(drug_id,start_date)
{
	var drug_ids = [];
	var start_dates = [];

	$('input[name="drug_ids[]"]').map(function() {
		drug_ids.push($(this).val());
	});

	$('input[name="start_dates[]"]').map(function() {
		start_dates.push($(this).parent().text().trim());
	});

	for (var i in drug_ids) {
		if (drug_ids[i] == drug_id && start_dates[i] == start_date) {
			return true;
		}
	}

	return false;
}

function update_risk_prophylaxis()
{
	var data = $('.event-content form').serialize();

	$.ajax({
		'type': 'POST',
		'url': baseUrl+'/OphCiAnaestheticassessment/default/riskProphylaxis',
		'data': $('.event-content form').serialize(),
		'dataType': 'json',
		'success': function(data) {
			$('#div_Element_OphCiAnaestheticassessment_DvtAssessment_Risk_Level .riskLevel').text(data['riskText']);
			$('#div_Element_OphCiAnaestheticassessment_DvtAssessment_Risk_Level .riskLevel').removeClass('red').removeClass('green').removeClass('blue').addClass(data['riskLevelColour']);

			$('#div_Element_OphCiAnaestheticassessment_DvtAssessment_Prophylaxis_required .prophylaxisRequired').html(data['prophylaxisRequired'].replace(/\n/g,'<br/>'));
		}
	});
}

function update_instructions_list(category_id)
{
	if (category_id == '') {
		$('#div_Element_OphCiAnaestheticassessment_PatientSpecificPreoperativeEducation_instructions').hide();
	} else {
		$.ajax({
			'type': 'GET',
			'url': baseUrl + '/OphCiAnaestheticassessment/default/instructionList?category_id=' + category_id,
			'success': function(html) {
				$('#div_Element_OphCiAnaestheticassessment_PatientSpecificPreoperativeEducation_instructions').replaceWith(html);
			}
		});
	}
}
