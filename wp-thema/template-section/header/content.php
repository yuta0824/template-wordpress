<?php
/**
 * Header Content
 *
 * @package WordPress
 */

$home = esc_url( home_url( '/' ) );
// $about    = esc_url( get_permalink( get_page_by_path( 'about' )->ID ) );
// $blog     = esc_url( get_post_type_archive_link( 'blog' ) );
// $category = esc_url( get_category_link( get_category_by_slug( 'category' )->term_id ) );
?>

<header class="l-header" id="js-header">
	<div class="p-header">
		<div class="p-header__inner">
		<h1>ロゴ</h1>
			<nav>
				<ul>
					<li><a href="<?php echo esc_url( $home ); ?>"></a></li>
					<li><a href="<?php echo esc_url( $home ); ?>"></a></li>
					<li><a href="<?php echo esc_url( $home ); ?>"></a></li>
				</ul>
			</nav>
		</div>
	</div>
</header>
