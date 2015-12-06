<?php 
if (isset($_POST['part_name']))
{
					
	$to= 'm.rustem18@gmail.com, info@technodetail.ru';
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
	$headers = "From: $from \r\n". 
	 		"Reply-To: $from \r\n". 
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
			<h4>Контактная информация</h4>
			<p>Имя: {$_POST['firstname']}</p>
			<p>Email: {$_POST['email']}</p>
			<p>Номер телефона: {$_POST['phone_number']}</p>
		</html>	
	";
	
	print_r $_FILES;
	
	if (isset($_FILES["drawing"]))  {//загрузка документа
		echo 'был прикреплен файл\r\n';
		if (is_uploaded_file($_FILES['drawing']['tmp_name'])) {
			echo 'загрузился\r\n';
			$tmp_name = $_FILES["drawing"]["tmp_name"];
			$name = $_FILES["drawing"]["name"];
			//$name = iconv('utf-8', 'cp1251', $name);
			$path="{$_SERVER['DOCUMENT_ROOT']}/files/$name";
			
			if(!move_uploaded_file($tmp_name, $path)) echo 'ошибка при перемещении\r\n';
			else {
				$fp = fopen($path,"rb");   
				if (!$fp) { 
					print "Cannot open file";   
					exit();   
				}   
				$file = fread($fp, filesize($path));   
				fclose($fp);    
				// $file_name = "file.ext"; // в этой переменной надо сформировать имя файла (без всякого пути)  
				$EOL = "\r\n"; // ограничитель строк, некоторые почтовые сервера требуют \n - подобрать опытным путём
				$boundary     = "--".md5(uniqid(time()));  // любая строка, которой не будет ниже в потоке данных.  
				$headers    = "MIME-Version: 1.0;$EOL";   
				$headers   .= "Content-Type: multipart/mixed; boundary=\"$boundary\"$EOL";  
				$headers   .= "From: $from \r\n". 
							"Reply-To: $from \r\n";
				
					
				$multipart  = "--$boundary$EOL";   
				$multipart .= "Content-Type: text/html; charset=utf-8$EOL";   
				$multipart .= "Content-Transfer-Encoding: base64$EOL";   
				$multipart .= $EOL; // раздел между заголовками и телом html-части 
				$multipart .= chunk_split(base64_encode($message));   

				$multipart .=  "$EOL--$boundary$EOL";   
				$multipart .= "Content-Type: application/octet-stream; name=\"$name\"$EOL";   
				$multipart .= "Content-Transfer-Encoding: base64$EOL";   
				$multipart .= "Content-Disposition: attachment; filename=\"$name\"$EOL";   
				$multipart .= $EOL; // раздел между заголовками и телом прикрепленного файла 
				$multipart .= chunk_split(base64_encode($file));   

				$multipart .= "$EOL--$boundary--$EOL";   
					
				// if(!mail($to, $subject, $multipart, $headers)) {
				// 	echo 'Письмо не отправлено. Свяжитесь, пожалуйста, с нами по контакному телефону или напишите нам на почту лично.';   
				// }  else { print "Спасибо за запрос. <br> В самое ближайшее время наши специалисты свяжутся с Вами."; }
				$message = $multipart;
				echo 'всё как бы ок да';
			}
		} else {
			echo 'не загрузился\r\n';
		}
	}
		
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