<?php
/**
 * Breadcrumb
 *
 * @package WordPress
 */

?>

<div class="l-breadcrumb" typeof="BreadcrumbList" vocab="https://schema.org/">
<div class="p-breadcrumb">
<?php
if ( function_exists( 'bcn_display' ) ) {
	bcn_display();
}
?>
</div>
</div>
