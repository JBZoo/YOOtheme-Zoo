<?php defined('_JEXEC') or die('Restricted access'); ?>

<?php $form = $this->application->getParamsForm()->setValues($this->params->get('global.config.')); ?>
<?php if ($form->getParamsCount('application-config')) : ?>
<h3 class="toggler"><?php echo JText::_('CONFIGURATION GLOBAL'); ?></h3>
<div class="content">
	<?php echo $form->render('params[config]', 'application-config'); ?>
</div>
<?php endif; ?>

<h3 class="toggler"><?php echo JText::_('TEMPLATE GLOBAL'); ?></h3>
<div class="content">
	<?php
		if ($template = $this->application->getTemplate()) {
			if ($params_form = $template->getParamsForm()) {
				echo $params_form->setValues($this->params->get('global.template.'))->render('params[template]', 'category');
				echo $params_form->setValues($this->params->get('global.template.'))->render('params[template]', 'item');
			}
		} else {
			echo '<em>'.JText::_('Please select a Template').'</em>';
		}
	?>
</div>

<?php foreach ($this->application->getAddonParamsForms() as $name => $params_form) : ?>
<h3 class="toggler"><?php echo JText::_($name); ?></h3>
<div class="content">
	<?php
		echo $params_form->setValues($this->params->get('global.'.strtolower($name).'.'))->render('addons['.strtolower($name).']');
	?>
</div>
<?php endforeach; ?>

<h3 class="toggler"><?php echo JText::_('PERMISSIONS'); ?></h3>
<div id="zoo-permissions" class="content">
	<ul class="parameter-form">
		<li class="parameter">
			<div class="label"><label class="hasTip" title="Permissions"><?php echo JText::_('APPLICATION'); ?></label></div>
			<div class="field">
				<a href="#rules-modal" style="cursor:pointer" title="Show popup" rel="{handler: 'adopt', size: {x: 1000, y: 700}, onClose:function(){document.getElementById('rules-modal-wrapper').adopt(this.content.firstChild);} }" class="modal"><?php echo $this->application->name; ?></a>
				<div id="rules-modal-wrapper" style="display:none">
				<div id="rules-modal">
					<h3>Application</h3>
					<?php echo str_replace('onchange="sendPermissions.call(this, event)"', 'onchange=""', $this->permissions->getInput('rules_application')); ?>
				</div>
				</div>
			</div>
		</li>
		<li>
			<div class="label"><label class="hasTip" title="Permissions">&nbsp;</label></div>
			<div class="field">
			</div>
		</li>
		<li>
			<div class="label"><label class="hasTip" title="Permissions"><?php echo JText::_('TYPES'); ?></label></div>
			<div class="field">
				<?php foreach ($this->assetPermissions as $permissionName => $permissions) : ?>
						<a href="#<?php echo $permissionName; ?>-rules-modal" style="cursor:pointer" title="Show popup" rel="{handler: 'adopt', size: {x: 1000, y: 700}, onClose:function(){document.getElementById('<?php echo $permissionName; ?>-rules-modal-wrapper').adopt(this.content.firstChild);}}" class="modal"><?php echo ucfirst($permissionName); ?></a>
						<div id="<?php echo $permissionName; ?>-rules-modal-wrapper" style="display:none">
						<div id="<?php echo $permissionName; ?>-rules-modal">
							<h3><?php echo ucfirst($permissionName); ?></h3>
							<?php
								echo str_replace(
									array('permission-', 'onchange="sendPermissions.call(this, event)"'),
									array('permission-' . $permissionName . '-', 'onchange=""'),
									$permissions->getInput('rules_' . $permissionName));
							?>
						</div>
						</div>
						<br/>
				<?php endforeach; ?>
			</div>
		</li>
	</ul>
</div>