package com.cedric.developer.demo2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cedric.developer.demo2.dto.UserDTO;
import com.cedric.developer.demo2.entity.User;
import com.cedric.developer.demo2.service.UserService;

@RestController
//@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class UserController {

	@Qualifier("UserService")
	@Autowired
	private UserService userService;

	@PostMapping("/users/addUser")
	public User createUser(@Validated @RequestBody UserDTO userDTO, BindingResult bd) {
		// UserDTO userDTO = new UserDTO();
		/*
		 * if (!bd.hasErrors()) { //userDTO = mapDTO(userDTO, user); }
		 */
		User user = new User();
		user = mapDTOToUser(userDTO, user);
		return userService.addUser(user);
	}

	@PutMapping("/users/{id}")
	public User updateUser(@Validated @RequestBody UserDTO userDTO,
			@PathVariable("id") Long id,
			BindingResult bd) {
		User user = new User();
		if (!bd.hasErrors()) {
			user = mapDTOToUser(userDTO, user);
			user = userService.updateUser(user, id);
		}
		return user;
	}

	@DeleteMapping("/users/{id}")
	public void deleteUser(@PathVariable("id") Long id) {
		UserDTO userDTO = new UserDTO();
		User user = new User();
		user = mapDTOToUser(userDTO, user);
		userService.deleteUser(user, id);
	}

	/* Does not work as expected */
	/*
	 * @GetMapping("/users") public List<UserDTO> getAllUsers() { List<User> users = userService.findAllUsers(); List<UserDTO> usersDTO = new
	 * ArrayList<UserDTO>(); usersDTO = mapArrayDTO(users); return usersDTO; }
	 */

	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userService.findAllUsers();
	}

	@GetMapping("/users/{id}")
	public UserDTO getUserById(@PathVariable("id") Long id) {
		User user = userService.findById(id);
		UserDTO userDTO = new UserDTO();
		userDTO = mapDTO(userDTO, user);
		return userDTO;
	}

	// Check if the name exists in the database
	// We get the email of the form
	@PostMapping("/users/registering/username")
	public boolean getUserByEmail(@RequestBody String username) {
		User user = new User();
		user = userService.findByUsername(username);
		if (user != null) {
			return true;
		}
		return false;
	}

	private UserDTO mapDTO(UserDTO userDTO, User user) {
		// TODO Auto-generated method stub
		userDTO.setId(user.getId());
		userDTO.setFirstname(user.getFirstname());
		userDTO.setUsername(user.getUsername());
		userDTO.setAge(user.getAge());
		userDTO.setSalary(user.getSalary());
		return userDTO;
	}

	/* Does not work as expected */
	/*
	 * private List<UserDTO> mapArrayDTO(List<User> users) { List<UserDTO> usersDTO = new ArrayList<UserDTO>(); UserDTO userDTO = new UserDTO();
	 * for (User u : users) { userDTO = mapDTO(userDTO, u); usersDTO.add(userDTO); } return usersDTO; }
	 */

	private User mapDTOToUser(UserDTO userDTO, User user) {
		user.setId(userDTO.getId());
		user.setAge(userDTO.getAge());
		user.setFirstname(userDTO.getFirstname());
		user.setUsername(userDTO.getUsername());
		user.setSalary(userDTO.getSalary());
		return user;
	}

}
