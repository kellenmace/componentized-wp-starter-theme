<?php
/**
 * Example component.
 *
 * Try calling this component from a page template and passing
 * it a 'name' prop, like this:
 * rt3_render_component( 'example', ['name' => 'George Costanza'] );
 */

 $name = $props['name'] ?? 'Kellen';
 ?>

<div class="example-component">
	<h1>Example Component</h1>
	<p>Here is an example component.</p>
	<p><?php echo "Why, hello there {$name}!"; ?></p>
</div>
