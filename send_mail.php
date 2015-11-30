<?php 
if (isset($_POST['part_name']))
{
					
	$to= 'm.rustem18@gmail.com';
	$subject = 'Онлайн-заказ';
	
	/*$headers = 'From: m.rustem18@gmail.com' . "\r\n" .
			'Content-type: text/html; charset=UTF-8 ' . "\r\n" . 
			'X-Mailer: PHP/' . phpversion();*/

	$from_user='technodetail.ru';
	$from_email='info@technodetail.ru';

	$from = "=?UTF-8?B?".base64_encode($from_user)."?= <" . $from_email . ">";
	//тема русским щрифтом
	$subject = "=?UTF-8?B?".base64_encode($subject)."?=";
	//формируем правильный заголовок в соответствии со стандартом
	$headers = "Reply-To: $from \r\n". 
			"MIME-Version: 1.0" . "\r\n" . 
			"Content-type: text/html; charset=UTF-8" . "\r\n"; 

	$message = "
		<html>				   		
			<p>Наименование детали: {$_POST['part_name']}</p>
			<p>Вид обработки листового металла: {$_POST['treatment']}</p>
			<p>Количество, штук: {$_POST['number_of_parts']}</p>
			<p>Покрытие изготовленных деталей: {$_POST['color']} {$_POST['size']}</p>
			<p>Оптимальный срок отгрузки: {$_POST['term']}</p>
			<p>Дополнительно: {$_POST['extra']}</p>
			<h5>Контактная информация</h5>
			<p>Имя: {$_POST['firstname']}</p>
			<p>Email: {$_POST['email']}</p>
			<p>Номер телефона: {$_POST['phone_number']}</p>
		</html>	
	";
		
	if(!mail($to, $subject, $message, $headers)) 
	{
		echo 'Письмо не отправлено. Свяжитесь, пожалуйста, с нами по контакному телефону или напишите нам на почту лично.';   
	}  
	else 
	{ 
		echo "ok"; 
	}  
			
}

?>