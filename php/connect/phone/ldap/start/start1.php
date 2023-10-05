<?php

try {
  require '/Web/linux/connect/connect.php';
  $sql = "DROP TABLE users, employees";
  $pdo->prepare($sql)->execute();
  $sql = "CREATE TABLE users
  (
      idusers integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
      cn character varying(100) COLLATE pg_catalog.default,
      title character varying(100) COLLATE pg_catalog.default,
      telephonenumber character varying(100) COLLATE pg_catalog.default,
      whenchanged character varying(100) COLLATE pg_catalog.default,
      department character varying(200) COLLATE pg_catalog.default,
      company character varying(2000) COLLATE pg_catalog.default,
      samaccountname character varying(100) COLLATE pg_catalog.default,
      mail character varying(100) COLLATE pg_catalog.default,
      manager character varying(200) COLLATE pg_catalog.default,
      objectsid character varying(2000) COLLATE pg_catalog.default,
      jpegphoto character varying(200) COLLATE pg_catalog.default,
      sono character varying(10) COLLATE pg_catalog.default,
      rang character varying(5) COLLATE pg_catalog.default,
      givenname character varying(100) COLLATE pg_catalog.default,
      sn character varying(30) COLLATE pg_catalog.default,
      departments character varying(2000) COLLATE pg_catalog.default,
      CONSTRAINT users_ID_PK PRIMARY KEY (idusers)
  );";
  $pdo->prepare($sql)->execute();


  $sql = "CREATE INDEX IF NOT EXISTS test2users
  ON public.users USING btree
  (objectsid COLLATE pg_catalog.default ASC NULLS LAST, cn COLLATE pg_catalog.default ASC NULLS LAST, sono COLLATE pg_catalog.default ASC NULLS LAST)
  TABLESPACE pg_default;";
  $pdo->prepare($sql)->execute();




  $sql = "CREATE TABLE employees
  (
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
      objectsid character varying(2000) COLLATE pg_catalog.default,
      cn character varying(200) COLLATE pg_catalog.default,
      employee character varying(200) COLLATE pg_catalog.default NOT NULL,
      department character varying(200) COLLATE pg_catalog.default,
      sono character varying(20) COLLATE pg_catalog.default,
      CONSTRAINT employees_pkey PRIMARY KEY (id)
  );";


  $pdo->prepare($sql)->execute();
  $sql = "CREATE INDEX IF NOT EXISTS test2employee
  ON employees USING btree
  (sono COLLATE pg_catalog.default ASC NULLS LAST, employee COLLATE pg_catalog.default ASC NULLS LAST)
  TABLESPACE pg_default;";
  $pdo->prepare($sql)->execute();

  echo "<h3>LDAP query test</h3>";
  echo "Connecting ...";
  $ds = ldap_connect("ldap://n5001-dc07.regions.tax.nalog.ru");
  $user = 'n7700_svc_ldap';
  $pass = '1Gfhjkmgfhjkm';
  ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
  ldap_set_option($ds, LDAP_OPT_REFERRALS, 0);
  ldap_set_option($ds, LDAP_OPT_SIZELIMIT, 150000);
  echo "connect result is " . $ds . "<br />";

  if ($ds) {
    echo "Binding ...";
    $r = ldap_bind($ds, $user, $pass);
    echo "Bind result is " . $r . "<br />";
    $dn = "OU=UNS,DC=regions,DC=tax,DC=nalog,DC=ru";
    $filter = "(&(!(department=Nul))(sAMAccountName=*)(!(cn=Nul))(!(givenName=Nul))(!(sn=Nul))(objectCategory=person)(!(manager=Nul))(!(company=Nul))(!(userAccountControl:1.2.840.113556.1.4.803:=2)))";
    $attributes = array("cn", "givenname", "sn", "title", "telephonenumber", "whenchanged", "department", "company", "samaccountname", "mail", "manager", "jpegphoto", "directreports");
    $cookie = '';
    require __DIR__ . '/common.php';
    echo "Closing connection";
    ldap_close($ds);
  } else {
    echo "<h4>Unable to connect to LDAP server</h4>";
  }
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
