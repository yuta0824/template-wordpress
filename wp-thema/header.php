<?php
/**
 * Header
 *
 * @package WordPress
 */

?>

<?php get_template_part( 'template-section/header/meta' ); ?>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php get_template_part( 'template-section/header/content' ); ?>
