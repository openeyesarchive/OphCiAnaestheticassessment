<?php
/**
 * OpenEyes
 *
 * (C) Moorfields Eye Hospital NHS Foundation Trust, 2008-2011
 * (C) OpenEyes Foundation, 2011-2013
 * This file is part of OpenEyes.
 * OpenEyes is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * OpenEyes is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with OpenEyes in a file titled COPYING. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package OpenEyes
 * @link http://www.openeyes.org.uk
 * @author OpenEyes <info@openeyes.org.uk>
 * @copyright Copyright (c) 2008-2011, Moorfields Eye Hospital NHS Foundation Trust
 * @copyright Copyright (c) 2011-2013, OpenEyes Foundation
 * @license http://www.gnu.org/licenses/gpl-3.0.html The GNU General Public License V3.0
 */
?>
<div class="element-fields">
	<div class="row field-row">
		<div class="large-3 column"><label>Investigations:</label></div>
		<div class="large-9 column end">
			<table class="grid investigations">
				<thead>
					<tr>
						<th>Investigation</th>
						<th>Ordered</th>
						<th>Reviewed</th>
						<th>Result</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr class="no_investigations"<?php if (!empty($element->investigations_assignments)) {?> style="display: none"<?php }?>>
						<td colspan="7">
							No investigations have been entered for this patient.
						</td>
					</tr>
					<?php if (!empty($element->investigations_assignments)) {?>
						<?php foreach ($element->investigations_assignments as $i => $investigation) {
							echo $this->renderPartial('_investigation_row',array('investigation'=>$investigation,'i'=>$i,'edit'=>true));
						}?>
					<?php }?>
				</tbody>
			</table>
		</div>
	</div>
	<div class="row field-row">
		<div class="large-3 column"><label></label></div>
		<div class="large-9 column end">
			<button class="addInvestigation secondary small">Add investigation</button>
		</div>
	</div>
	<?php echo $form->textArea($element, 'comments', array(), false, array(), array('label' => 3, 'field' => 4))?>
</div>
