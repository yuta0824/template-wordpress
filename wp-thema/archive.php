<?php
/**
 * Archive
 *
 * @package WordPress
 */

?>

<?php get_header(); ?>

<nav aria-label="ナビゲーション">
<?php
$categories = get_categories();
if ( ! empty( $categories ) ) :
	foreach ( $categories as $category ) :
		?>
<a href="<?php esc_url( get_category_link( $category->term_id ) ); ?>"><?php echo esc_html( $category->name ); ?></a>
<?php endforeach; ?>
<?php endif; ?>
</nav>

<?php if ( have_posts() ) : ?>
	<?php while ( have_posts() ) : ?>
		<?php the_post(); ?>
		<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
	<?php endwhile; ?>
<?php endif; ?>

<?php if ( paginate_links() ) : ?>
<div class="p-pagination">
	<?php
	echo wp_kses_post(
		paginate_links(
			array(
				'end_size'  =>
				1,
				'mid_size'  => 1,
				'prev_next' => true,
				'prev_text' =>
				'<span>前のページに戻る</span>',
				'next_text' =>
				'<span>次のページに進む</span>',
			)
		)
	);
	?>
</div>
<?php endif; ?>

<?php get_footer(); ?>
