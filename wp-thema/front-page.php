<?php
/**
 * Front Page
 *
 * @package WordPress
 */

get_header();
?>

<button id="js-button-alert" type="button">JS Check</button>
<p class="test">フロントページ</p>


<img src="<?php echo esc_url( get_template_directory_uri() ); ?>" alt="">
<p><?php echo esc_html( get_the_title() ); ?></p>
<?php the_title(); ?>

<?php get_sidebar(); ?>
<?php
get_footer();

